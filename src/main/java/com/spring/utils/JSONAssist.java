package com.spring.utils;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

public class JSONAssist {
	public static String HBASE_RATE_PREFIX;
	public static String HBASE_RATE_POSTFIX;
	private static final String CLASSPATH = JSONAssist.class.getResource("/").getPath();
	static {
		BufferedReader reader = null;
		try {
			reader = new BufferedReader(
					new InputStreamReader(new FileInputStream(CLASSPATH + "hbase_rate.json"), "UTF-8"));
			HBASE_RATE_PREFIX = reader.readLine();
			HBASE_RATE_POSTFIX = reader.readLine();
			System.out.println(HBASE_RATE_PREFIX + "\n" + HBASE_RATE_POSTFIX);
		} catch (IOException e) {
			throw new RuntimeException("hbase_rate.json read error");
		} finally {
			if (null != reader)
				try {
					reader.close();
				} catch (IOException e) {
					e.printStackTrace();
				}

		}
	}

	public static final String HBASE_MAP_LOCATION_PREFIX;
	public static final String HBASE_MAP_LOCATION_POSTFIX;
	public static final String[] PROVINCES = new String[] { "北京", "天津", "河北", "山西", "内蒙古", "辽宁", "吉林", "黑龙江", "上海",
			"江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "新疆", "青海", "西藏", "甘肃", "宁夏", "陕西", "四川", "重庆", "云南", "贵州",
			"湖南", "广西", "广东","海南","台湾"};
	static {
		BufferedReader reader = null;
		try {
			reader = new BufferedReader(
					new InputStreamReader(new FileInputStream(CLASSPATH + "map_location.json"), "UTF-8"));
			HBASE_MAP_LOCATION_PREFIX = reader.readLine();
			HBASE_MAP_LOCATION_POSTFIX = reader.readLine();
			// System.out.println(HBASE_RATE_PREFIX + "\n" +
			// HBASE_MAP_LOCATION_POSTFIX);
		} catch (IOException e) {
			throw new RuntimeException("hbase_rate.json read error");
		} finally {
			if (null != reader)
				try {
					reader.close();
				} catch (IOException e) {
					e.printStackTrace();
				}

		}
	}

	public static void main(String[] args) {
		System.out.println(HBASE_RATE_PREFIX + "\n" + HBASE_RATE_POSTFIX);
	}
}
