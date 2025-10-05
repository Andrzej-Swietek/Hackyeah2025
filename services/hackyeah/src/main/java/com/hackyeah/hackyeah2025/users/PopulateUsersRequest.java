package com.hackyeah.hackyeah2025.users;

import java.util.List;

public record PopulateUsersRequest(
        List<String> userIds
) {
}
