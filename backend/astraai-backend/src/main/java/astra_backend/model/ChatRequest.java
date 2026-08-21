package astra_backend.model;

import java.util.List;

public class ChatRequest {

    private String message;

    private List<ChatMessage> history;

    private Long conversationId;

    private String username;

    private String displayName;

    // =====================================================
    // DEFAULT CONSTRUCTOR
    // =====================================================

    public ChatRequest() {
    }

    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public ChatRequest(
            String message,
            List<ChatMessage> history,
            Long conversationId,
            String username,
            String displayName
    ) {
        this.message = message;
        this.history = history;
        this.conversationId = conversationId;
        this.username = username;
        this.displayName = displayName;
    }

    // =====================================================
    // MESSAGE
    // =====================================================

    public String getMessage() {
        return message;
    }

    public void setMessage(
            String message
    ) {
        this.message = message;
    }

    // =====================================================
    // HISTORY
    // =====================================================

    public List<ChatMessage> getHistory() {
        return history;
    }

    public void setHistory(
            List<ChatMessage> history
    ) {
        this.history = history;
    }

    // =====================================================
    // CONVERSATION ID
    // =====================================================

    public Long getConversationId() {
        return conversationId;
    }

    public void setConversationId(
            Long conversationId
    ) {
        this.conversationId =
                conversationId;
    }

    // =====================================================
    // USERNAME
    // =====================================================

    public String getUsername() {
        return username;
    }

    public void setUsername(
            String username
    ) {
        this.username = username;
    }

    // =====================================================
    // DISPLAY NAME
    // =====================================================

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(
            String displayName
    ) {
        this.displayName =
                displayName;
    }

    // =====================================================
    // CHAT MESSAGE
    // =====================================================

    public static class ChatMessage {

        private String role;

        private String content;

        public ChatMessage() {
        }

        public ChatMessage(
                String role,
                String content
        ) {
            this.role = role;
            this.content = content;
        }

        public String getRole() {
            return role;
        }

        public void setRole(
                String role
        ) {
            this.role = role;
        }

        public String getContent() {
            return content;
        }

        public void setContent(
                String content
        ) {
            this.content = content;
        }
    }
}