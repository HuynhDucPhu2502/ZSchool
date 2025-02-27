package me.huynhducphu.zschool_backend.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 *  Admin 2/27/2025
 *  
**/
@RequiredArgsConstructor
public enum ContactStatus {
    PENDING("PENDING"), DONE("DONE0");

    private final String displayName;

    @Override
    public String toString() {
        return displayName;
    }
}
