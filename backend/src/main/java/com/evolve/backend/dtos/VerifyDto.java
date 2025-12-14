package com.evolve.backend.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyDto {

    private String verificationCode;
    private Long userId;

}
