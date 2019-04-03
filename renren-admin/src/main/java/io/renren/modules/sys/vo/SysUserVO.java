package io.renren.modules.sys.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.renren.common.validator.group.AddGroup;
import io.renren.common.validator.group.RegisterGroup;
import io.renren.common.validator.group.UpdateGroup;
import io.renren.common.validator.group.UserInfoAddGroup;
import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.io.Serializable;

/**
 * @author tanwubo
 */
@Data
@ToString
public class SysUserVO implements Serializable {
    private static final long serialVersionUID = 1L;
    /**
     * 用户id
     */
    private Long userId;
    /**
     * 姓名
     */
    private String name;
    /**
     * 公司名称
     */
    private String company;
    /**
     * 用户名
     */
    @NotBlank(message="用户名不能为空", groups = {RegisterGroup.class})
    @Pattern(regexp = "^((17[0-9])|(14[0-9])|(13[0-9])|(15[^4,\\D])|(18[0,5-9]))\\d{8}$",message = "用户名输入不合法，请输入正确的手机号",groups = {RegisterGroup.class})
    private String username;
    /**
     * 密码
     */
    @NotBlank(message="密码不能为空", groups = {RegisterGroup.class})
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    /**
     * 验证码
     */
    @NotBlank(message="验证码不能为空", groups = {RegisterGroup.class})
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String captcha;
    /**
     * 工号
     */
    private String jobNumber;
    /**
     * 身份证
     */
    private String identityCard;
    /**
     * 邮箱
     */
    private String email;
    /**
     * 审核状态，0-待审核，1-审核通过
     */
    private Integer audit;



}
