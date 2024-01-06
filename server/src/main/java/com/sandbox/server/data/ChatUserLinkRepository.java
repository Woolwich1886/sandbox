package com.sandbox.server.data;

import com.sandbox.server.entity.ChatUserLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatUserLinkRepository extends JpaRepository<ChatUserLink, Long>, JpaSpecificationExecutor<ChatUserLink> {

    List<ChatUserLink> findAllByChatId(Long id);;

}
