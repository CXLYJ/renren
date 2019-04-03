package io.renren.modules.sys.vo;

import lombok.Data;

import java.io.Serializable;

/**
 * @author tanwubo
 */
@Data
public class DictionaryVO implements Serializable {
    private static final long serialVersionUID = 1L;
    /**
     * 字典名称
     */
    private String name;
    /**
     * 字典类型
     */
    private String type;
    /**
     * 字典码
     */
    private String code;
    /**
     * 字典值
     */
    private String value;
    /**
     * 排序
     */
    private Integer orderNum;
}
