package com.spring.service;

import com.spring.domain.VisibleData;

public interface VisibleDataService {
	
	public void saveOrUpdate(VisibleData visibleData);

	public VisibleData query(String id);
}
