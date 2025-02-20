package me.huynhducphu.zschool_backend.repository;

import me.huynhducphu.zschool_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Admin 2/20/2025
 **/
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String userName);
}
