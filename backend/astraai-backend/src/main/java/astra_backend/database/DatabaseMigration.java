package astra_backend.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class DatabaseMigration {

    public static void main(String[] args) {

        String url =
                "jdbc:sqlite:astra.db";

        try (
                Connection connection =
                        DriverManager.getConnection(url);

                Statement statement =
                        connection.createStatement()
        ) {

            System.out.println(
                    "Connected to SQLite database."
            );

            boolean passwordExists = false;

            ResultSet result =
                    statement.executeQuery(
                            "PRAGMA table_info(users)"
                    );

            while (result.next()) {

                String columnName =
                        result.getString("name");

                if (
                        "password"
                                .equalsIgnoreCase(
                                        columnName
                                )
                ) {

                    passwordExists = true;

                    break;
                }
            }

            result.close();

            if (!passwordExists) {

                System.out.println(
                        "Adding password column..."
                );

                statement.executeUpdate(
                        "ALTER TABLE users " +
                        "ADD COLUMN password TEXT " +
                        "NOT NULL DEFAULT ''"
                );

                System.out.println(
                        "Password column added successfully."
                );

            } else {

                System.out.println(
                        "Password column already exists."
                );
            }

        } catch (Exception e) {

            System.err.println(
                    "Database migration failed."
            );

            e.printStackTrace();
        }
    }
}