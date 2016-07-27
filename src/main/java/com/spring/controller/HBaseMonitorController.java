package com.spring.controller;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


import com.spring.utils.JSONAssist;

@Controller
@RequestMapping("/hbase")
public class HBaseMonitorController {
	
	
	@RequestMapping(value = "/hbaseRate")
	public void hbaseRate(HttpServletRequest request, HttpServletResponse response)
			throws UnsupportedEncodingException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		System.out.println(request.getParameter("data"));
	}
	
	@RequestMapping("/hbaseMapLocation")
    public void hbaseMapLocation (HttpServletRequest request,
			  HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		
		StringBuilder sb = new StringBuilder();
		for(String s : JSONAssist.PROVINCES){
			int num = (int)(Math.random() * 100);
			sb.append(String.format("[\"%s\",%d],",s,num));
		}
		sb.deleteCharAt(sb.length() - 1);
		String resp = JSONAssist.HBASE_MAP_LOCATION_PREFIX + sb.toString() + JSONAssist.HBASE_MAP_LOCATION_POSTFIX;
		System.out.println(resp);
		
		try{
		response.getWriter().write(resp);
		}catch(IOException e){
			e.printStackTrace();
		}
		
	
    }	
	public static void main(String[] args) {
		System.out.println("dd");
	}
}