package com.sandbox.server.data;

import com.sandbox.server.entity.ChatUserLink;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import org.springframework.data.jpa.domain.Specification;

public class ChatSpecification {

    public static Specification<ChatUserLink> byUserChat(Long id) {
        return ((root, query, criteriaBuilder) -> {
            Subquery<Long> subquery = query.subquery(Long.class);
            Root<ChatUserLink> subRoot = subquery.from(ChatUserLink.class);
            subquery.select(subRoot.get("chat").get("id")).where(criteriaBuilder.equal(subRoot.get("user").get("id"), id));
            query.where(
                    criteriaBuilder.notEqual(root.get("user").get("id"), id),
                    root.get("chat").get("id").in(subquery.getSelection())
            );
            return query.getRestriction();
        });
    }

}
