package com.spring.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.dao.VisibleDataDao;
import com.spring.domain.VisibleData;
import com.spring.service.VisibleDataService;
@Service
@Transactional
public class VisibleDataServiceImpl implements VisibleDataService{
	@Autowired
	private VisibleDataDao visibleDataDao;
	
	public VisibleDataDao getVisibleDataDao() {
		return visibleDataDao;
	}

	public void setVisibleDataDao(VisibleDataDao visibleDataDao) {
		this.visibleDataDao = visibleDataDao;
	}

	@Override
	public void saveOrUpdate(VisibleData visibleData) {
		visibleDataDao.saveOrUpdate(visibleData);
	}

	@Override
	public VisibleData query(String id) {
		VisibleData v = visibleDataDao.get(VisibleData.class, id);
		return v;
	}



	

}
