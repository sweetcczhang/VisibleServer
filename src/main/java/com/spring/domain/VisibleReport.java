package com.spring.domain;

import javax.persistence.*;

/**
 * Created by cuidanyang on 16/8/15.
 */
@Entity
public class VisibleReport {
    @Id
    @Column(name = "visible_report_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(columnDefinition="MEDIUMTEXT")
    private String reportData;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getReportData() {
        return reportData;
    }

    public void setReportData(String reportData) {
        this.reportData = reportData;
    }

    public void setUserNoJson(User user){
        this.user = user;
    }
}
