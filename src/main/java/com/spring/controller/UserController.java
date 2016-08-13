package com.spring.controller;

import com.alibaba.fastjson.JSON;
import com.spring.domain.UserCache;
import com.spring.jsonuserd.UserCacheOrientedJson;
import com.spring.service.UserService;
import com.spring.utils.JSONAssist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by cuidanyang on 16/8/13.
 */
@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;


    @RequestMapping("/login")
    public void login (HttpServletRequest request,
                                  HttpServletResponse response,
                                  @RequestParam("user") String user,
                                  @RequestParam("pwd") String pwd) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");

        String format = "{\"SUCCESS\":%b,\"code\":%d}";
        int res = userService.login(user,pwd);
        String ret = String.format(format,res > 0 ? true:false,res);

        try {
            response.getWriter().write(ret);

        }catch (IOException e){
            e.printStackTrace();
        }
    }

    @RequestMapping("/addNewUserCache")
    public void addNewUserCache (HttpServletRequest request,
                       HttpServletResponse response,
                       @RequestParam("userid") Integer userid,
                       @RequestParam("usercache") String usercache) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");

        String format = "{\"SUCCESS\":%b,\"code\":%d,\"DATA\":%s}";

        userService.saveUserCache(userid,usercache);

        try {
            String ret = String.format(format,true,0);
            response.getWriter().write(ret);

        }catch (IOException e){
            e.printStackTrace();
        }
    }

    @RequestMapping("/getallcache")
    public void getAllUserCacheByUserid(HttpServletRequest request,
                                 HttpServletResponse response,
                                 @RequestParam("userid") Integer userid) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");

        String format = "{\"SUCCESS\":%b,\"code\":%d,\"DATA\":%s}";

        List<UserCache> list = userService.getUserCacheByUserid(userid);
        List<UserCacheOrientedJson> listJson = list.stream().map(
                userCache ->  new UserCacheOrientedJson().rcvUserCacheAndTransform(userCache)
        ).collect(Collectors.toList());

        String ret = JSON.toJSONString(listJson);
        ret = String.format(format,true,0,ret);

        try {
            response.getWriter().write(ret);
        }catch (IOException e){
            e.printStackTrace();
        }
    }
}
