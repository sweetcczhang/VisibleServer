package com.spring.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;


public class MyUtil {

	public static Object handle(String date) {
		// TODO Auto-generated method stub
		StringBuilder sb = new StringBuilder();
		sb.append(date.substring(0, 4));
		sb.append("-");
		sb.append(date.substring(4, 6));
		sb.append("-");
		sb.append(date.substring(6,8));
		
		return sb.toString();
	}
	public static String getFileName(String line){
		String[] res = line.split("[;]");
		for(String tmp:res){
			
			tmp = tmp.trim();
			System.out.println(tmp);
			String[] pairs  = tmp.split("=");
			if(pairs.length < 2)
				continue;
			if(pairs[0].equals("filename"))
				return pairs[1].replaceAll("\"", "");
		}
		return null;
	}


	public static List<String> stringToList(String s){
		if(s == null)
			throw new RuntimeException("stringToList s == null");
		String[] strlist = s.split("[\t]");
		return Arrays.asList(strlist);
	}
	public static List<List<Object>> readXml(String filePath) throws FileNotFoundException, IOException{
		POIFSFileSystem fs=new POIFSFileSystem(new FileInputStream(filePath));
		//得到Excel工作簿对象
		HSSFWorkbook wb = new HSSFWorkbook(fs);
		//得到Excel工作表对象
		HSSFSheet sheet = wb.getSheetAt(0);
//		sheet.g
//		System.out.println(sheet.getFirstRowNum() + "  " + sheet.getLastRowNum());

		//得到Excel工作表的行
		HSSFRow row = sheet.getRow(0);

		//得到Excel工作表指定行的单元格





		return null;
	}
	public static void main(String[] args) throws FileNotFoundException, IOException {
		readXml("/Users/storm/Desktop/movie.xls");
	}
	public static List<List<String>> readTXTFile(String filePath){
		BufferedReader reader;
		try {
			reader = new BufferedReader(new InputStreamReader(new FileInputStream(new File(filePath)),"utf-8"));
			String line = null;
			List<List<String>> lists = new ArrayList<>();
			while((line = reader.readLine()) != null){
				List<String> listItem = MyUtil.stringToList(line);
				lists.add(listItem);
			}
			return lists;

		}catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;

	}
}
