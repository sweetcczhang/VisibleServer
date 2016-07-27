package com.spring.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class VisibleData {

	@Id
	@Column(name = "id")
	private String id;

	 @Column(columnDefinition="MEDIUMTEXT")
	private String bar;
	 @Column(columnDefinition="MEDIUMTEXT")
	private String line;
	 @Column(columnDefinition="MEDIUMTEXT")
	private String pie;
	 @Column(columnDefinition="MEDIUMTEXT")
	private String timeline;
	 @Column(columnDefinition="MEDIUMTEXT")
	private String parallel;
	 @Column(columnDefinition="MEDIUMTEXT")
	private String tree;
	 @Column(columnDefinition="MEDIUMTEXT")
	private String ford;
	 @Column(columnDefinition="MEDIUMTEXT")
	private String map;
	 @Column(columnDefinition="MEDIUMTEXT")
	private String word;
	 @Column(columnDefinition="MEDIUMTEXT")
	private String radar;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getBar() {
		return bar;
	}

	public void setBar(String bar) {
		this.bar = bar;
	}

	public String getLine() {
		return line;
	}

	public void setLine(String line) {
		this.line = line;
	}

	public String getPie() {
		return pie;
	}

	public void setPie(String pie) {
		this.pie = pie;
	}

	public String getTimeline() {
		return timeline;
	}

	public void setTimeline(String timeline) {
		this.timeline = timeline;
	}

	public String getParallel() {
		return parallel;
	}

	public void setParallel(String parallel) {
		this.parallel = parallel;
	}

	public String getTree() {
		return tree;
	}

	public void setTree(String tree) {
		this.tree = tree;
	}

	public String getFord() {
		return ford;
	}

	public void setFord(String ford) {
		this.ford = ford;
	}

	public String getMap() {
		return map;
	}

	public void setMap(String map) {
		this.map = map;
	}

	public String getWord() {
		return word;
	}

	public void setWord(String word) {
		this.word = word;
	}

	public String getRadar() {
		return radar;
	}

	public void setRadar(String radar) {
		this.radar = radar;
	}

	public String getJSONString() {
		StringBuilder sb = new StringBuilder();

		if (getBar() != null) {
			sb.append(String.format("%s,", getBar()));
		}
		if (getLine() != null)
			sb.append(String.format("%s,", getBar()));

		if (getPie() != null) {
			sb.append(String.format("%s,", getPie()));
		}

		if (getTimeline() != null)
			sb.append(String.format("%s,", getTimeline()));

		if (getParallel() != null)
			sb.append(String.format("%s,", getParallel()));

		if (getTree() != null)
			sb.append(String.format("%s,", getTree()));

		if (getFord() != null)
			sb.append(String.format("%s,", getFord()));

		if (getMap() != null)
			sb.append(String.format("%s,", getMap()));

		if (getWord() != null)
			sb.append(String.format("%s,", getWord()));

		if (getRadar() != null)
			sb.append(String.format("%s,", getRadar()));
		
		sb.deleteCharAt(sb.length() - 1);
		String res = String.format("[%s]", sb.toString());
		return res;
	}
}
