package io.renren.modules.sys.exception;

import org.apache.shiro.authc.DisabledAccountException;


/**
 * 账户为通过审核
 * @author tanwubo
 */
public class UnauditedAccountException extends DisabledAccountException {
    public UnauditedAccountException() {
    }

    public UnauditedAccountException(String message) {
        super(message);
    }

    public UnauditedAccountException(Throwable cause) {
        super(cause);
    }

    public UnauditedAccountException(String message, Throwable cause) {
        super(message, cause);
    }
}
