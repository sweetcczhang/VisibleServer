package com.spring.jsonuserd;

import com.alibaba.fastjson.JSON;
import com.spring.dao.UserCacheDao;
import com.spring.domain.User;
import com.spring.domain.UserCache;

import java.util.List;

/**
 * Created by cuidanyang on 16/8/13.
 */
public class UserCacheOrientedJson {
    private Integer id;
    private String title;
    private String description;
    private String relation;
    private List<List> property;
    private Integer relationType;

    private Integer userid;

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

    public String getRelation() {
        return relation;
    }

    public void setRelation(String relation) {
        this.relation = relation;
    }

    public List<List> getProperty() {
        return property;
    }

    public void setProperty(List<List> property) {
        this.property = property;
    }

    public Integer getRelationType() {
        return relationType;
    }

    public void setRelationType(Integer relationType) {
        this.relationType = relationType;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public UserCacheOrientedJson rcvUserCacheAndTransform(UserCache userCache){
        this.id = userCache.getId();
        this.description = userCache.getDescription();
        this.title = userCache.getTitle();
        this.relation = userCache.getRelation();
        this.relationType = userCache.getRelationType();
        this.userid = userCache.getUser() == null ? -1 : userCache.getUser().getId();
        this.property = JSON.parseArray(userCache.getProperty(),List.class);
        return this;

    }
    public UserCache transformToUsercache(){
        UserCache userCache = new UserCache();
        userCache.setId(id);
        userCache.setDescription(description);
        userCache.setProperty(JSON.toJSONString(userCache.getProperty()));
        userCache.setRelation(this.relation);
        userCache.setRelationType(this.relationType);
        userCache.setTitle(this.title);

        return userCache;
    }
}
