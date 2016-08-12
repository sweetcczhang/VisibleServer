package com.spring.domain;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by cuidanyang on 16/8/12.
 */
@Entity
@Table
public class UserCache {
    private Integer id;
    private Integer userId;
    private String title;
    private String desc;
    private Integer relationType;
    private String relation;
    private String property;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public Integer getRelationType() {
        return relationType;
    }

    public void setRelationType(Integer relationType) {
        this.relationType = relationType;
    }

    public String getProperty() {
        return property;
    }

    public void setProperty(String property) {
        this.property = property;
    }
}
