package com.spring.service;

import com.spring.domain.UserCache;

import java.util.List;

/**
 * Created by cuidanyang on 16/8/13.
 */
public interface UserService {

    public static final int LOGIN_FAILED = -1;
    public static final int LOGIN_NAME_NOT_FOUND = -2;

    public int login(String user,String password);
    public List<UserCache> getUserCacheByUserid(Integer id);
    public void saveUserCache(Integer userid,String userCache);
}
