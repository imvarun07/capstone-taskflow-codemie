package com.example.todo.controller.dto;

import jakarta.validation.constraints.Size;

public record UpdateTodoRequest(
        @Size(max = 255, message = "タイトルは255文字以内で入力してください")
        String title,
        Boolean completed
) {
}
