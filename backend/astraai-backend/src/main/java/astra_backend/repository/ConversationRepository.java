package astra_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import astra_backend.model.Conversation;
import astra_backend.model.User;

public interface ConversationRepository
        extends JpaRepository<Conversation, Long> {

    List<Conversation> findByUserOrderByUpdatedAtDesc(
            User user
    );
}