package com.spring.jsonuserd;

import com.alibaba.fastjson.JSON;
import com.spring.dao.UserCacheDao;
import com.spring.domain.User;
import com.spring.domain.UserCache;

import java.util.List;
import java.util.Map;

/**
 * Created by cuidanyang on 16/8/13.
 */
public class UserCacheOrientedJson {
    private Integer id;
    private String title;
    private String describe;
    private Map<String, List<List<Object>>> relations;
    private List<List> property;
    private List<Object> objects;
    private Integer relationtype;
    private Integer userid;


    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

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

    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    public Map<String, List<List<Object>>> getRelations() {
        return relations;
    }

    public void setRelations(Map<String, List<List<Object>>> relations) {
        this.relations = relations;
    }

    public List<List> getProperty() {
        return property;
    }

    public void setProperty(List<List> property) {
        this.property = property;
    }

    public List<Object> getObjects() {
        return objects;
    }

    public void setObjects(List<Object> objects) {
        this.objects = objects;
    }

    public Integer getRelationtype() {
        return relationtype;
    }

    public void setRelationtype(Integer relationtype) {
        this.relationtype = relationtype;
    }

    public UserCacheOrientedJson rcvUserCacheAndTransform(UserCache userCache) {
        this.id = userCache.getId();
        this.describe = userCache.getDescription();
        this.title = userCache.getTitle();
        this.relations = (Map<String, List<List<Object>>>) JSON.parse(userCache.getRelations());
        this.relationtype = userCache.getRelationtype();
        this.userid = userCache.getUser() == null ? -1 : userCache.getUser().getId();

        this.property = JSON.parseArray(userCache.getProperty(), List.class);
        this.objects = JSON.parseArray(userCache.getObjects(), Object.class);

        return this;

    }

    public UserCache transformToUsercache() {
        UserCache userCache = new UserCache();
        userCache.setId(id);
        userCache.setDescription(describe);

        userCache.setProperty(JSON.toJSONString(property));
        userCache.setObjects(JSON.toJSONString(objects));

        System.out.println("property:" + JSON.toJSONString(property));
        System.out.println("objects:" + JSON.toJSONString(objects));


        userCache.setRelations(JSON.toJSONString(this.relations));
        userCache.setRelationtype(this.relationtype);
        userCache.setTitle(this.title);

        return userCache;
    }
}
