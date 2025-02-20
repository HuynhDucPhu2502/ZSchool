package me.huynhducphu.zschool_backend.repository;

import me.huynhducphu.zschool_backend.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Admin 2/20/2025
 **/
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);
}
