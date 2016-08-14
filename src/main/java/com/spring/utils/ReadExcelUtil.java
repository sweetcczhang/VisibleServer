package com.spring.utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.spring.domain.UserCache;
import com.spring.jsonuserd.UserCacheOrientedJson;
import org.apache.poi.hssf.record.chart.ObjectLinkRecord;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.formula.eval.StringEval;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.alibaba.fastjson.JSON;

/**
 * @author Hongten
 * @created 2014-5-20
 */
public class ReadExcelUtil {

    /**
     * read the Excel file
     *
     * @param path
     * the path of the Excel file
     * @return
     * @throws IOException
     */
    public static final String OFFICE_EXCEL_2003_POSTFIX = "xls";
    public static final String OFFICE_EXCEL_2010_POSTFIX = "xlsx";

    public List<List<String>> readExcel(String path) throws IOException {

        StringBuilder sb = new StringBuilder(path);
        String postfix = sb.substring(sb.lastIndexOf(".") + 1);


        if (OFFICE_EXCEL_2003_POSTFIX.equals(postfix)) {
            return readXls(path);
        } else if (OFFICE_EXCEL_2010_POSTFIX.equals(postfix)) {
            return readXlsx(path);
        } else {
            System.out.println("uncorrect postfix!");
        }

        return null;
    }

    /**
     * Read the Excel 2010
     *
     * @param path the path of the excel file
     * @return
     * @throws IOException
     */
    public List<List<String>> readXlsx(String path) throws IOException {
        System.out.println("start process path...");
        InputStream is = new FileInputStream(path);
        @SuppressWarnings("resource")
        XSSFWorkbook xssfWorkbook = new XSSFWorkbook(is);

        List<List<String>> list = new ArrayList<List<String>>();
        // Read the Sheet
        for (int numSheet = 0; numSheet < xssfWorkbook.getNumberOfSheets(); numSheet++) {
            XSSFSheet xssfSheet = xssfWorkbook.getSheetAt(numSheet);
            if (xssfSheet == null) {
                continue;
            }
            // Read the Row
            for (int rowNum = 0; rowNum <= xssfSheet.getLastRowNum(); rowNum++) {
                XSSFRow xssfRow = xssfSheet.getRow(rowNum);
                List<String> listRow = new ArrayList<>();


                // Field descriptor #4 I

                if (xssfRow != null) {
                    String value = null;
                    for (Cell cell : xssfRow) {
                        switch (cell.getCellType()) {
                            case Cell.CELL_TYPE_STRING:
                                value = cell.getStringCellValue();
                                break;
                            case Cell.CELL_TYPE_NUMERIC:
                                value = Double.toString(cell.getNumericCellValue());
                            case Cell.CELL_TYPE_BLANK:

                            default:
                                break;
                        }

                        listRow.add(value);
                    }

                    list.add(listRow);
                }
            }
        }
        return list;
    }

    /**
     * Read the Excel 2003-2007
     *
     * @param path the path of the Excel
     * @return
     * @throws IOException
     */
    public List<List<String>> readXls(String path) throws IOException {
        System.out.println("start process path...");
        InputStream is = new FileInputStream(path);
        HSSFWorkbook hssfWorkbook = new HSSFWorkbook(is);

        List<List<String>> list = new ArrayList<List<String>>();
        // Read the Sheet
        for (int numSheet = 0; numSheet < hssfWorkbook.getNumberOfSheets(); numSheet++) {
            HSSFSheet hssfSheet = hssfWorkbook.getSheetAt(numSheet);
            if (hssfSheet == null) {
                continue;
            }
            // Read the Row
            for (int rowNum = 1; rowNum <= hssfSheet.getLastRowNum(); rowNum++) {
                HSSFRow hssfRow = hssfSheet.getRow(rowNum);
                List<String> listRow = new ArrayList<>();
                listRow.clear();
                if (hssfRow != null) {
                    for (Cell cell : hssfRow) {
                        String cellValue;
                        if (cell == null || (cellValue = cell.getStringCellValue()) == null)
                            break;
                        listRow.add(cellValue);
                    }

                    list.add(listRow);
                }
            }
        }
        System.out.println("end ,completed!");
        return list;
    }

    @SuppressWarnings("static-access")
    private String getValue(XSSFCell xssfRow) {
        if (xssfRow.getCellType() == xssfRow.CELL_TYPE_BOOLEAN) {
            return String.valueOf(xssfRow.getBooleanCellValue());
        } else if (xssfRow.getCellType() == xssfRow.CELL_TYPE_NUMERIC) {
            return String.valueOf(xssfRow.getNumericCellValue());
        } else {
            return String.valueOf(xssfRow.getStringCellValue());
        }
    }

    @SuppressWarnings("static-access")
    private String getValue(HSSFCell hssfCell) {
        if (hssfCell.getCellType() == hssfCell.CELL_TYPE_BOOLEAN) {
            return String.valueOf(hssfCell.getBooleanCellValue());
        } else if (hssfCell.getCellType() == hssfCell.CELL_TYPE_NUMERIC) {
            return String.valueOf(hssfCell.getNumericCellValue());
        } else {
            return String.valueOf(hssfCell.getStringCellValue());
        }
    }

    public static void main(String[] args) throws IOException {
        List<List<String>> results = null;
        results = new ReadExcelUtil().readExcel("/Users/cuidanyang/idea/VisibleServer/target/VisibleServer/WEB-INF/file/upload/text.xlsx");

        System.out.println(results);

        parseToUserCache(results,"title","mydesc",3);
    }

    public static UserCacheOrientedJson transformToUserCacheJson(Map<String, List<List<Object>>> relations,
                                                                 String title,
                                                                 String desc,
                                                                 Integer relationtype,
                                                                 List<Object> propertyValue) {

        UserCacheOrientedJson cacheJson = new UserCacheOrientedJson();
        cacheJson.setObjects(new ArrayList<>(relations.keySet()));
        cacheJson.setRelationtype(relationtype);
        cacheJson.setDescribe(desc);
        cacheJson.setTitle(title);
        List<List> lists = new ArrayList<>();
        lists.add(new ArrayList<Object>(propertyValue));
        cacheJson.setProperty(lists);

        cacheJson.setRelations(relations);

        return cacheJson;

    }

    public static UserCache transformToUserCache(Map<String, List<List<Object>>> relations,
                                                 String title,
                                                 String desc,
                                                 Integer relationtype,
                                                 List<Object> propertyValue) {
        return transformToUserCacheJson(relations, title, desc, relationtype, propertyValue)
                .transformToUsercache();
    }

    public static UserCache parseToUserCache(List<List<String>> lists,String title,String desc,int relationtype){

        int propertyLen = lists.get(0).size() - 1;
        List<String> listOne = lists.remove(0);
        listOne.remove(0);
        List<Object> propertyValue = new ArrayList<>(listOne);
       // System.out.println(propertyValue);

        Map<String ,List<List<Object>>> relations = new HashMap<>();
       // System.out.println(lists.size());
        lists.forEach(list ->{
           // System.out.println(list);
            List<List<Object>> values = relations.get(list.get(0));
          //  System.out.println(list.get(0));

            if (values == null){
                values = new ArrayList<List<Object>>();
                relations.put(list.get(0),values);
            }

            list.remove(0);
            values.add(new ArrayList<>(list));
          //  System.out.println(values);
        });

       // System.out.println(relations);
       // System.out.println("end");
        UserCache userCache = transformToUserCache(relations,title,desc,relationtype,propertyValue);
        System.out.println(userCache.getObjects() + " &&&&  " + userCache.getProperty());
        return userCache;

    }
}