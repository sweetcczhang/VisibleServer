package com.spring.utils;

public class SqlUtil {

	public static String getcQuery(String name, String edutime) {
		// TODO Auto-generated method stub
		String hql = "from Candidate c where ";
		if (name != null && !name.equals("")) {
			hql= hql+"c.name like '%"+name+"%' and ";
		}
		if (edutime != null && !edutime.equals("") ) {
			hql = hql +"c.edutime = '" + edutime +"' and ";
		}
		hql= hql.substring(0, hql.length()-4);
	
		return hql;
	}
	
	public static String getpQuery(String name, String edutime) {
		// TODO Auto-generated method stub
		String hql = "from Person p where ";
		if (name != null && !name.equals("")) {
			hql= hql+"p.name like '%"+name+"%' and ";
		}
		if (edutime != null && !edutime.equals("") ) {
			hql = hql +"p.edutime = '" + edutime +"' and ";
		}
		hql= hql.substring(0, hql.length()-4);
	
		return hql;
	}

}
