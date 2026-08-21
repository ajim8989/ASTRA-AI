package astra_backend.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import astra_backend.model.ChatRequest.ChatMessage;

@Service
public class ChatService {

    private final RestTemplate restTemplate =
            new RestTemplate();

    private static final String OLLAMA_URL =
            "http://127.0.0.1:11434/api/chat";

    private static final String MODEL_NAME =
            "qwen3:1.7b";

    // =====================================================
    // SEND MESSAGE TO OLLAMA
    // =====================================================

    public String sendToOllama(
            String message,
            List<ChatMessage> history,
            String username,
            String displayName
    ) {

        HttpHeaders headers =
                new HttpHeaders();

        headers.setContentType(
                MediaType.APPLICATION_JSON
        );

        // =================================================
        // BUILD OLLAMA MESSAGE LIST
        // =================================================

        List<Map<String, String>> ollamaMessages =
                new ArrayList<>();

        // =================================================
        // SYSTEM MESSAGE
        // =================================================

        Map<String, String> systemMessage =
                new HashMap<>();

        systemMessage.put(
                "role",
                "system"
        );

        String userContext =
                """
                You are ASTRA AI, a helpful conversational AI assistant.

                CURRENT LOGGED-IN USER:
                Username: %s
                Display name: %s

                IMPORTANT:
                - The username and display name above belong to the current logged-in user.
                - If the user asks for their username, provide the username above.
                - If the user asks for their display name or name, provide the display name above.
                - Use the conversation history provided to you.
                - Remember information the user has already told you.
                - If the user tells you about a project, remember the project details.
                - Answer questions using the conversation history.
                - Do not claim that you cannot access the conversation history.
                - Do not invent personal information.
                - Only use personal information explicitly provided in the current user context or conversation history.
                """
                .formatted(
                        username,
                        displayName
                );

        systemMessage.put(
                "content",
                userContext
        );

        ollamaMessages.add(
                systemMessage
        );

        // =================================================
        // ADD PREVIOUS HISTORY
        // =================================================

        if (history != null) {

            for (
                    ChatMessage chatMessage :
                    history
            ) {

                if (
                        chatMessage != null &&
                        chatMessage.getRole() != null &&
                        chatMessage.getContent() != null &&
                        (
                                chatMessage
                                        .getRole()
                                        .equals("user")
                                ||
                                chatMessage
                                        .getRole()
                                        .equals("assistant")
                        )
                ) {

                    Map<String, String>
                            historyMessage =
                            new HashMap<>();

                    historyMessage.put(
                            "role",
                            chatMessage
                                    .getRole()
                    );

                    historyMessage.put(
                            "content",
                            chatMessage
                                    .getContent()
                    );

                    ollamaMessages.add(
                            historyMessage
                    );
                }
            }
        }

        // =================================================
        // ADD CURRENT USER MESSAGE
        // =================================================

        Map<String, String>
                currentMessage =
                new HashMap<>();

        currentMessage.put(
                "role",
                "user"
        );

        currentMessage.put(
                "content",
                message
        );

        ollamaMessages.add(
                currentMessage
        );

        // =================================================
        // DEBUG
        // =================================================

        System.out.println(
                "\n========== ASTRA -> OLLAMA =========="
        );

        System.out.println(
                "Username: " +
                username
        );

        System.out.println(
                "Display Name: " +
                displayName
        );

        System.out.println(
                "Message: " +
                message
        );

        System.out.println(
                "History messages: " +
                (
                        history == null
                                ? 0
                                : history.size()
                )
        );

        System.out.println(
                "====================================\n"
        );

        // =================================================
        // OLLAMA REQUEST
        // =================================================

        Map<String, Object> request =
                new HashMap<>();

        request.put(
                "model",
                MODEL_NAME
        );

        request.put(
                "messages",
                ollamaMessages
        );

        request.put(
                "stream",
                false
        );

        HttpEntity<Map<String, Object>>
                entity =
                new HttpEntity<>(
                        request,
                        headers
                );

        // =================================================
        // CALL OLLAMA
        // =================================================

        ResponseEntity<Map>
                response =
                restTemplate.postForEntity(
                        OLLAMA_URL,
                        entity,
                        Map.class
                );

        // =================================================
        // PROCESS RESPONSE
        // =================================================

        Map body =
                response.getBody();

        if (body == null) {

            return
                    "Ollama returned an empty response.";
        }

        Map messageObject =
                (Map) body.get(
                        "message"
                );

        if (messageObject == null) {

            return
                    "ASTRA AI returned an empty response.";
        }

        Object content =
                messageObject.get(
                        "content"
                );

        if (content == null) {

            return
                    "ASTRA AI returned an empty response.";
        }

        String aiResponse =
                content.toString();

        System.out.println(
                "ASTRA AI Response: " +
                aiResponse
        );

        return aiResponse;
    }
}