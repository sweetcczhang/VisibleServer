package com.spring.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

/**
 * Created by cuidanyang on 16/8/12.
 */
@Entity
@Table
public class User {
    @Id
    private Integer id;
    private String user;
    private String password;
    private List<UserCache> list;

    @OneToMany
    public List<UserCache> getList() {
        return list;
    }

    public void setList(List<UserCache> list) {
        this.list = list;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

