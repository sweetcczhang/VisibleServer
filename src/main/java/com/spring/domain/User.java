package com.spring.domain;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by cuidanyang on 16/8/12.
 */
@Entity
public class User {
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String user;
    private String password;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Set<UserCache> cacheSet = new HashSet<>();

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

    public Set<UserCache> getCacheSet() {
        return cacheSet;
    }

    public void setCacheSet(Set<UserCache> cacheSet) {
        this.cacheSet = cacheSet;
    }
}



