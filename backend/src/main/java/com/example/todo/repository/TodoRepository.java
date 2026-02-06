package com.example.todo.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import com.example.todo.domain.Todo;

@Repository
public class TodoRepository {

    private static final DateTimeFormatter SQLITE_DT =
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private final JdbcClient jdbc;

    public TodoRepository(JdbcClient jdbc) {
        this.jdbc = jdbc;
    }

    /* ---------- RowMapper ---------- */

    private static final RowMapper<Todo> ROW_MAPPER = (ResultSet rs, int rowNum) -> {
        var todo = new Todo();
        todo.setId(rs.getLong("id"));
        todo.setTitle(rs.getString("title"));
        todo.setCompleted(rs.getInt("completed") == 1);
        todo.setCreatedAt(parseDateTime(rs.getString("created_at")));
        todo.setUpdatedAt(parseDateTime(rs.getString("updated_at")));
        return todo;
    };

    private static LocalDateTime parseDateTime(String value) {
        if (value == null) return null;
        return LocalDateTime.parse(value, SQLITE_DT);
    }

    /* ---------- CRUD ---------- */

    public List<Todo> findAll() {
        return jdbc.sql("SELECT * FROM todos ORDER BY created_at DESC")
                .query(ROW_MAPPER)
                .list();
    }

    public Optional<Todo> findById(Long id) {
        return jdbc.sql("SELECT * FROM todos WHERE id = :id")
                .param("id", id)
                .query(ROW_MAPPER)
                .optional();
    }

    public Todo create(String title) {
        var now = LocalDateTime.now().format(SQLITE_DT);
        jdbc.sql("""
                INSERT INTO todos (title, completed, created_at, updated_at)
                VALUES (:title, 0, :now, :now)
                """)
                .param("title", title)
                .param("now", now)
                .update();

        // SQLite: last_insert_rowid() で直前の AUTOINCREMENT ID を取得
        return jdbc.sql("SELECT * FROM todos WHERE id = last_insert_rowid()")
                .query(ROW_MAPPER)
                .single();
    }

    public int update(Long id, String title, Boolean completed) {
        var now = LocalDateTime.now().format(SQLITE_DT);

        var sb = new StringBuilder("UPDATE todos SET updated_at = :now");
        if (title != null) sb.append(", title = :title");
        if (completed != null) sb.append(", completed = :completed");
        sb.append(" WHERE id = :id");

        var stmt = jdbc.sql(sb.toString())
                .param("now", now)
                .param("id", id);
        if (title != null) stmt = stmt.param("title", title);
        if (completed != null) stmt = stmt.param("completed", completed ? 1 : 0);

        return stmt.update();
    }

    public int deleteById(Long id) {
        return jdbc.sql("DELETE FROM todos WHERE id = :id")
                .param("id", id)
                .update();
    }
}
