package com.example.todo.config;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;

/**
 * SQLite の DB ファイル格納ディレクトリを起動時に自動作成する。
 */
@Configuration
public class DataSourceInitializer {

    @PostConstruct
    public void ensureDataDirectory() throws IOException {
        Files.createDirectories(Path.of("./data"));
    }
}
