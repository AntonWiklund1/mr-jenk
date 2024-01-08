package com.gritlabstudent.user.ms.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;

    @NotBlank(message = "User name cannot be empty")
    private String name;

    @NotBlank(message = "User email cannot be empty")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "User password cannot be empty")
    private String password;

    @NotNull(message = "User role cannot be null")
    private String role;

    private String avatarImagePath; // New field for avatar image path

    public String uuidGenerator() {
        return UUID.randomUUID().toString();
    }

}
