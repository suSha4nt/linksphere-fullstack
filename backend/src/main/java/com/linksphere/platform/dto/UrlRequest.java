package com.linksphere.platform.dto;

import lombok.Data;

@Data
public class UrlRequest {

    private String url;

    private Integer expiryMinutes; // ✅ optional
}