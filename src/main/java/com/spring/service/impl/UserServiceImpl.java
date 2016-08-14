package com.spring.service.impl;

import com.alibaba.fastjson.JSON;
import com.spring.dao.UserCacheDao;
import com.spring.dao.UserDao;
import com.spring.domain.User;
import com.spring.domain.UserCache;
import com.spring.jsonuserd.UserCacheOrientedJson;
import com.spring.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by cuidanyang on 16/8/13.
 */
@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;
    @Autowired
    private UserCacheDao userCacheDao;

    @Override
    public int login(String user, String password) {
        if (user == null || user.length() == 0 || password == null || password.length() == 0)
            return UserService.LOGIN_FAILED;
        String format = "FROM User u WHERE u.user LIKE '%s' AND u.password LIKE '%s'" ;
        String hql = String.format(format,user,password);
        System.out.println(hql);
        List<User> users = userDao.query(hql);

        if (users == null || users.size() == 0)
            return UserService.LOGIN_NAME_NOT_FOUND;

        return users.get(0).getId();
    }

    @Override
    public List<UserCache> getUserCacheByUserid(Integer id) {
        User user = userDao.get(User.class,id);

        if (user == null) return null;

        return new ArrayList<>(user.getCacheSet());
    }

    @Override
    public void saveUserCache(Integer userid, String userCache) {
        User user = userDao.get(User.class,userid);
        UserCacheOrientedJson cacheJson = JSON.parseObject(userCache, UserCacheOrientedJson.class);
        user.getCacheSet().add(cacheJson.transformToUsercache());
        userDao.saveOrUpdate(user);
    }

    @Override
    public UserCache saveUserCache(Integer userid, UserCache userCache) {
        User user = userDao.get(User.class,userid);
        if (user == null)
            return null;

        userCache.setUser(user);
        System.out.println("-------" + userCache.getObjects() + "-------");
        System.out.println("(" + userCache.getProperty()+")");
        userCacheDao.saveOrUpdate(userCache);

        return userCache;
    }

    @Override
    public boolean deleteUserCache(Integer userid, Integer userCacheId) {
        userCacheDao.delete(UserCache.class,userCacheId);
        return false;
    }
}
