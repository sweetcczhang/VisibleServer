package com.spring.utils;

import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.web.context.support.XmlWebApplicationContext;

public class SpringApplicationContextInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext>{ 
	  
	
	@Override
	public void initialize(ConfigurableApplicationContext applicationContext) {
		// TODO Auto-generated method stub
		System.out.println("------------"+applicationContext.getClass().getName()+"----------");
	}
	}  