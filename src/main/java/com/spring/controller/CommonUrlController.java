package com.spring.controller;

import com.alibaba.fastjson.JSON;
import com.spring.domain.UserCache;
import com.spring.domain.VisibleData;
import com.spring.jsonuserd.UserCacheOrientedJson;
import com.spring.service.UserService;
import com.spring.service.VisibleDataService;
import com.spring.utils.MyUtil;
import com.spring.utils.ReadExcelUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLDecoder;
import java.util.*;
import java.util.stream.Collectors;


@Controller
@RequestMapping("/visual")
public class CommonUrlController {
	@Autowired
	private UserService userService;

	String suffix = "views/";
	@Autowired
	VisibleDataService visibleDataService;

	private static Deque<String> queue = new ArrayDeque<>(20);

	@RequestMapping("index")
	public String index(HttpServletRequest request) {
		return suffix + "index";
	}

	@RequestMapping("visual-index")
	public String visualIndex(HttpServletRequest request) {
		return suffix + "visual-index";
	}

	@RequestMapping("view")
	public String view(HttpServletRequest request) {
		// System.out.println("---productUpload---");
		return suffix + "view";
	}
	@RequestMapping("developer")
	public String developer(HttpServletRequest request) {
		return suffix + "developer";
	}
	@RequestMapping("login")
	public String login(HttpServletRequest request) {
		return suffix + "login";
	}

	@RequestMapping("NetOpt")
	public String NetOpt(HttpServletRequest request) {
		return suffix + "NetOpt";
	}

	@RequestMapping("Library")
	public String Library(HttpServletRequest request) {
		return suffix + "Library";
	}

	@RequestMapping("ThingNet")
	public String ThingNet(HttpServletRequest request) {
		return suffix + "ThingNet";
	}

	@RequestMapping("PhonePro")
	public String PhonePro(HttpServletRequest request) {
		return suffix + "PhonePro";
	}

	@RequestMapping("visual-report")
	public String visualReport(HttpServletRequest request) {
		return suffix + "visual-html5";
	}

	@RequestMapping("reportPC")
	public String reportPC(HttpServletRequest request) {
		return suffix + "report-pc";
	}
	@RequestMapping("reportPhone")
	public String reportPhone(HttpServletRequest request) {
		return suffix + "report-phone";
	}


	@RequestMapping("upload_file")
	public void uploadFile(HttpServletRequest request,
						   HttpServletResponse response,
						   @RequestParam MultipartFile[] myfiles,
						   @RequestParam("userid") Integer userid,
						   @RequestParam("desc") String desc,
						   @RequestParam("title") String title,
						   @RequestParam("relationtype") int relationtype) {
		System.out.println(request.getQueryString());

		desc = URLDecoder.decode(desc);
		title = URLDecoder.decode(title);




		//System.out.println("apkFile name:" + myfiles[0].getName());
		MultipartFile f = myfiles[0];
		System.out.println(f.getOriginalFilename());
		System.out.println(f.getSize());
		String filePath = request.getServletContext().getRealPath("/WEB-INF/file/upload/");
		String saveFilePath = filePath  + f.getOriginalFilename();
		System.out.println(saveFilePath);
		InputStream in = null;
		FileOutputStream out = null;
		try {
			byte[] buffer = new byte[1024];
			in = f.getInputStream();
			if (in == null)
				System.out.println("input is invalid");
			else
				System.out.println("input is valid");
			out = new FileOutputStream(new File(saveFilePath));
			int count = 0;
			while ((count = in.read(buffer)) > 0) {
				out.write(buffer, 0, count);
			}
			out.flush();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (in != null)
				try {
					in.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			if (out != null)
				try {
					out.close();
				} catch (IOException e) {
					e.printStackTrace();
				}

		}
		StringBuilder sb = new StringBuilder(saveFilePath);
		String postfix = sb.substring(sb.lastIndexOf(".") + 1);
		List<List<String>> results = null;

		if ("txt".equals(postfix)) {
			System.out.println("....hjjhh....");
			results = MyUtil.readTXTFile(saveFilePath);
		} else {
			try {
				results = new ReadExcelUtil().readExcel(saveFilePath);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		List<List<String>> formatedResults = new ArrayList<>();

		results.forEach( result->{
			formatedResults.add(result.stream()
					.filter(item->!StringUtils.isBlank(item))
					.collect(Collectors.toList()));
		});




		System.out.println(formatedResults);
		results = formatedResults;

		UserCache userCache = ReadExcelUtil.parseToUserCache(results,title,desc,relationtype);
		System.out.println("******" + userCache.getObjects() + "*****");
		userService.saveUserCache(userid,userCache);

		UserCacheOrientedJson cacheJson = new UserCacheOrientedJson().rcvUserCacheAndTransform(userCache);
		String format = "{\"SUCCESS\":%b,\"code\":%d,\"DATA\":%s}";
		String ret;
		if (cacheJson == null){
			ret = String.format(format,false,0,"\"\"");
		}else {
			ret= String.format(format,true,0,JSON.toJSONString(cacheJson));
		}

		try {

			response.getWriter().write(ret);
			response.getWriter().flush();
			System.out.println(ret);
		} catch (IOException e) {
			e.printStackTrace();
		}

	}


	@RequestMapping("/upload_data")
	public void test(HttpServletRequest request, HttpServletResponse response, @RequestParam("id") String id,
			@RequestParam("type") Integer type, @RequestParam("data") String data) {
		VisibleData visibleData = null;
		if(id == null || id.length() == 0){
			try {
				response.getWriter().write("{\"SUCCESS\":\"FALSE\"}");
				return;
			} catch (IOException e) {
				e.printStackTrace();
				return;
			}
		}
			
		visibleData = visibleDataService.query(id);
		
		if (null == visibleData){
			visibleData = new VisibleData();
			visibleData.setId(id);
		}
		switch (type) {
		case 1:
			visibleData.setBar(data);
			break;
		case 2:
			visibleData.setPie(data);
			break;
		case 3:
			visibleData.setTimeline(data);
			break;
		case 4:
			visibleData.setTimeline(data);
			break;
		case 5:
			visibleData.setParallel(data);
			break;
		case 6:
			visibleData.setTree(data);
			break;
		case 7:
			visibleData.setFord(data);
			break;
		case 8:
			visibleData.setMap(data);
			break;
		case 9:
			visibleData.setWord(data);
			break;
		case 10:
			visibleData.setRadar(data);
			break;
		default:
			break;
		}

		visibleDataService.saveOrUpdate(visibleData);
		try {
			response.getWriter().write("{\"SUCCESS\":\"TRUE\"}");
			return;
		} catch (IOException e) {
			e.printStackTrace();
			return;
		}
	}
	@RequestMapping("/get_data")
	public void getData(HttpServletRequest request, HttpServletResponse response, @RequestParam("id") String id) {
		VisibleData visibleData = null;
		visibleData = visibleDataService.query(id);
		String json = visibleData.getJSONString();
		try {
			String resp = String.format("{\"SUCCESS\":\"TRUE\",\"DATA\":%s}", json);
			response.getWriter().write(resp);
			response.getWriter().flush();
			response.getWriter().close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
