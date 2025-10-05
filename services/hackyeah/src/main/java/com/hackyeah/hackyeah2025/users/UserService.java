package com.hackyeah.hackyeah2025.users;

import org.keycloak.representations.idm.UserRepresentation;

public interface UserService {
    UserRepresentation getUserDetails(String userId);

    String getUserRoles(String userId);
}
