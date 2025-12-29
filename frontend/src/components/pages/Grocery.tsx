import { useMemo } from "react";
import BodyLayout from "../layouts/BodyLayout";
import { useAppContext } from "@/lib/AppProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getShoppingItemsByUserId,
  uncheckShoppingItems,
} from "@/api/shoppingItem";
import { Card } from "../elements/Card";
import type { ShoppingItem } from "@/lib/Types";
import Loader from "../elements/Loader";
import { purchaseShoppingItem } from "@/api/shoppingItem";

interface GroupedShoppingList {
  [category: string]: ShoppingItem[];
}
const Grocery = () => {
  const { user } = useAppContext();
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery<GroupedShoppingList>({
    queryKey: ["shopping-items"],
    queryFn: () => getShoppingItemsByUserId(user?.id || -1),
    enabled: !!user?.id,
  });

  const items = useMemo(() => {
    return data;
  }, [data]);

  const { mutate: purchase } = useMutation({
    mutationKey: ["purchase-grocery"],
    mutationFn: (itemId: number) => purchaseShoppingItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shopping-items"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: uncheck, isPending: isUncheckPending } = useMutation({
    mutationKey: ["uncheck-all-shopping-items"],
    mutationFn: () => uncheckShoppingItems(user?.id || -1),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["shopping-items"] });
      const checkboxes = document.querySelectorAll<HTMLInputElement>(
        'input[type="checkbox"]'
      );
      checkboxes.forEach((input) => {
        input.checked = false;
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  console.log(items);

  return isPending ? (
    <Loader />
  ) : (
    <BodyLayout>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-xl font-bold">Weekly Shopping List</h1>
        {Object.keys(items ?? {}).length > 0 ? (
          <h4
            className="text-[#FF6B6B] font-semibold cursor-pointer flex items-center gap-3"
            onClick={() => {
              uncheck();
            }}
          >
            <span>Clear Checked</span>
            {isUncheckPending && (
              <div className="w-5 h-5 border-4 border-t-[#FF6B6B] border-gray-300 rounded-full animate-spin"></div>
            )}
          </h4>
        ) : (
          <div></div>
        )}
      </div>
      {Object.keys(items ?? {}).length > 0 ? (
        <div className="space-y-6">
          {items &&
            Object.entries(items).map(([category, items]) => (
              <Card key={category} noPadding>
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
                  <h3 className="font-bold text-gray-700 capitalize">
                    {category.toLowerCase()}
                  </h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {items.map((item, idx) => (
                    <label
                      key={`${item.id}-${idx}`}
                      className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        defaultChecked={item.purchased}
                        className="w-5 h-5 rounded border-gray-300 text-[#FF6B6B] focus:ring-[#FF6B6B] checkbox-input"
                        onClick={() => {
                          purchase(item.id);
                        }}
                      />
                      <div className="ml-3 flex-1">
                        <span
                          className={`font-medium ${
                            item.purchased
                              ? "line-through text-gray-400"
                              : "text-gray-900"
                          }`}
                        >
                          {item.name}
                        </span>
                      </div>
                      <span className="text-gray-500 text-sm">
                        {item.quantity}{" "}
                      </span>
                    </label>
                  ))}
                </div>
              </Card>
            ))}
        </div>
      ) : (
        <p className="text-center text-xl font-semibold text-blue-400">
          Complete your profile and generate your customized fitness program !
        </p>
      )}
    </BodyLayout>
  );
};

export default Grocery;
