package com.spring.service;

import com.spring.domain.UserCache;
import com.spring.domain.VisibleReport;

import java.util.List;
import java.util.Set;

/**
 * Created by cuidanyang on 16/8/13.
 */
public interface UserService {

    public static final int LOGIN_FAILED = -1;
    public static final int LOGIN_NAME_NOT_FOUND = -2;

    public int login(String user,String password);
    public List<UserCache> getUserCacheByUserid(Integer id);
    public void saveUserCache(Integer userid,String userCache);
    public UserCache saveUserCache(Integer userid,UserCache userCache);
    public boolean deleteUserCache(Integer userid,Integer userCacheId);
    public boolean saveNewReport(Integer userid,String report);
    public List<VisibleReport> getAllUserReport(Integer userid);
    public VisibleReport getReportByReportId(Integer id);
    public boolean deleteReport(Integer reportid);

}
