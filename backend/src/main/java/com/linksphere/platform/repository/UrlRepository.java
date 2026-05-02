package com.linksphere.platform.repository;

import com.linksphere.platform.entity.UrlMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface UrlRepository extends JpaRepository<UrlMapping, Long> {
    Optional<UrlMapping> findByShortCode(String shortCode);

    Optional<UrlMapping> findByShortCodeAndStatus(
            String shortCode, UrlMapping.LinkStatus status);

    Optional<UrlMapping> findByOriginalUrl(String originalUrl);

    List<UrlMapping> findByExpiryDateBeforeAndStatus(
            LocalDateTime now, UrlMapping.LinkStatus status);

    List<UrlMapping> findTop10ByOrderByClickCountDesc();

    long countByStatus(UrlMapping.LinkStatus status);

}
