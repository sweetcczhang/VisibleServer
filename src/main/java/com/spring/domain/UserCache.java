package com.spring.domain;

import javax.persistence.*;

/**
 * Created by cuidanyang on 16/8/12.
 */
@Entity()
public class UserCache {
    @Id
    @Column(name = "user_cache_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    @Column(columnDefinition="MEDIUMTEXT")
    private String description;
    @Column(columnDefinition="MEDIUMTEXT")
    private String relations;
    @Column(columnDefinition="MEDIUMTEXT")
    private String property;
    private Integer relationtype;
    @Column(columnDefinition="MEDIUMTEXT")
    private String objects;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRelations() {
        return relations;
    }

    public void setRelations(String relations) {
        this.relations = relations;
    }

    public String getProperty() {
        return property;
    }

    public void setProperty(String property) {
        this.property = property;
    }

    public Integer getRelationtype() {
        return relationtype;
    }

    public void setRelationtype(Integer relationtype) {
        this.relationtype = relationtype;
    }


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getObjects() {
        return objects;
    }

    public void setObjects(String objects) {
        this.objects = objects;
    }
}
