package astra_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import astra_backend.model.ChatMessage;
import astra_backend.model.Conversation;

public interface ChatMessageRepository
        extends JpaRepository<ChatMessage, Long> {

    List<ChatMessage> findByConversationOrderByCreatedAtAsc(
            Conversation conversation
    );
}