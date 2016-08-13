package com.spring.dao.impl;

import com.spring.dao.UserDao;
import com.spring.domain.User;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

/**
 * Created by cuidanyang on 16/8/13.
 */
@Repository
public class UserDaoImpl extends BaseDaoImpl<User> implements UserDao {
}
