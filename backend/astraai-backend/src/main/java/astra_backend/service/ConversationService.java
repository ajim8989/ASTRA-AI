package astra_backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import astra_backend.model.ChatMessage;
import astra_backend.model.Conversation;
import astra_backend.model.User;
import astra_backend.repository.ChatMessageRepository;
import astra_backend.repository.ConversationRepository;
import astra_backend.repository.UserRepository;

@Service
public class ConversationService {

    private final ConversationRepository conversationRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;

    public ConversationService(
            ConversationRepository conversationRepository,
            ChatMessageRepository chatMessageRepository,
            UserRepository userRepository
    ) {
        this.conversationRepository =
                conversationRepository;

        this.chatMessageRepository =
                chatMessageRepository;

        this.userRepository =
                userRepository;
    }

    // =====================================================
    // GET USER BY USERNAME
    // =====================================================

    public User getUserByUsername(
            String username
    ) {

        if (
                username == null ||
                username.trim().isEmpty()
        ) {
            throw new RuntimeException(
                    "Username cannot be empty."
            );
        }

        return userRepository
                .findByUsername(
                        username.trim()
                )
                .orElseThrow(
                        () ->
                                new RuntimeException(
                                        "User not found: "
                                                + username
                                )
                );
    }

    // =====================================================
    // GET OR CREATE DEFAULT USER
    // =====================================================

    public User getOrCreateUser() {

        return userRepository
                .findByUsername("maruti")
                .orElseGet(() -> {

                    User user =
                            new User(
                                    "maruti",
                                    "Maruti"
                            );

                    return userRepository.save(
                            user
                    );
                });
    }

    // =====================================================
    // CREATE CONVERSATION
    // =====================================================

    public Conversation createConversation(
            String title
    ) {

        User user =
                getOrCreateUser();

        Conversation conversation =
                new Conversation(
                        title,
                        user
                );

        return conversationRepository.save(
                conversation
        );
    }

    // =====================================================
    // CREATE CONVERSATION FOR USER
    // =====================================================

    public Conversation createConversation(
            String title,
            String username
    ) {

        User user =
                getUserByUsername(
                        username
                );

        Conversation conversation =
                new Conversation(
                        title,
                        user
                );

        return conversationRepository.save(
                conversation
        );
    }

    // =====================================================
    // GET CONVERSATION
    // =====================================================

    public Conversation getConversation(
            Long id
    ) {

        return conversationRepository
                .findById(id)
                .orElseThrow(
                        () ->
                                new RuntimeException(
                                        "Conversation not found: "
                                                + id
                                )
                );
    }

    // =====================================================
    // GET ALL CONVERSATIONS
    // =====================================================

    public List<Conversation>
    getAllConversations() {

        User user =
                getOrCreateUser();

        return conversationRepository
                .findByUserOrderByUpdatedAtDesc(
                        user
                );
    }

    // =====================================================
    // GET CONVERSATIONS FOR USER
    // =====================================================

    public List<Conversation>
    getAllConversations(
            String username
    ) {

        User user =
                getUserByUsername(
                        username
                );

        return conversationRepository
                .findByUserOrderByUpdatedAtDesc(
                        user
                );
    }

    // =====================================================
    // SAVE MESSAGE
    // =====================================================

    public ChatMessage saveMessage(
            Long conversationId,
            String role,
            String content
    ) {

        Conversation conversation =
                getConversation(
                        conversationId
                );

        ChatMessage message =
                new ChatMessage(
                        role,
                        content,
                        conversation
                );

        ChatMessage savedMessage =
                chatMessageRepository.save(
                        message
                );

        conversation.setUpdatedAt(
                LocalDateTime.now()
        );

        conversationRepository.save(
                conversation
        );

        return savedMessage;
    }

    // =====================================================
    // GET MESSAGES
    // =====================================================

    public List<ChatMessage>
    getMessages(
            Long conversationId
    ) {

        Conversation conversation =
                getConversation(
                        conversationId
                );

        return chatMessageRepository
                .findByConversationOrderByCreatedAtAsc(
                        conversation
                );
    }

    // =====================================================
    // UPDATE CONVERSATION TITLE
    // =====================================================

    public Conversation updateConversationTitle(
            Long conversationId,
            String title
    ) {

        Conversation conversation =
                getConversation(
                        conversationId
                );

        conversation.setTitle(
                title
        );

        conversation.setUpdatedAt(
                LocalDateTime.now()
        );

        return conversationRepository.save(
                conversation
        );
    }

    // =====================================================
    // DELETE CONVERSATION
    // =====================================================

    public void deleteConversation(
            Long conversationId
    ) {

        Conversation conversation =
                getConversation(
                        conversationId
                );

        List<ChatMessage> messages =
                chatMessageRepository
                        .findByConversationOrderByCreatedAtAsc(
                                conversation
                        );

        chatMessageRepository.deleteAll(
                messages
        );

        conversationRepository.delete(
                conversation
        );
    }
}