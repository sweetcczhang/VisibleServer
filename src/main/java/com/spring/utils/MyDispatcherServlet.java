package com.spring.utils;

import java.util.Enumeration;

import javax.servlet.ServletException;

import org.springframework.web.servlet.DispatcherServlet;

public class MyDispatcherServlet extends DispatcherServlet{

	@Override
	protected void initFrameworkServlet() throws ServletException {
		// TODO Auto-generated method stub
		super.initFrameworkServlet();
		Enumeration<String> s = this.getServletConfig().getInitParameterNames();
		for (Enumeration<String> e = s; e.hasMoreElements();)
		       System.out.println(e.nextElement());
		
	}

	

}
