/**
 * Copyright 2018 人人开源 http://www.renren.io
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

package io.renren.modules.sys.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.SysDictDao;
import io.renren.modules.sys.entity.SysDictEntity;
import io.renren.modules.sys.service.SysDictService;
import io.renren.modules.sys.vo.DictionaryVO;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author tanwubo
 */
@Service("sysDictService")
public class SysDictServiceImpl extends ServiceImpl<SysDictDao, SysDictEntity> implements SysDictService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        String name = (String) params.get("name");
        String type = (String) params.get("type");

        Page<SysDictEntity> page = this.selectPage(
                new Query<SysDictEntity>(params).getPage(),
                new EntityWrapper<SysDictEntity>()
                        .like(StringUtils.isNotBlank(name), "name", name)
                        .eq(StringUtils.isNotBlank(name), "type", type)
        );

        return new PageUtils(page);
    }

    @Override
    public List<DictionaryVO> queryByType(String type) {
        List<SysDictEntity> sysDictList = this.selectList(new EntityWrapper<SysDictEntity>().eq("type", type).orderBy("order_num",true));
        List<DictionaryVO> dictionaryList = new ArrayList<>();
        for (SysDictEntity sysDictEntity : sysDictList) {
            DictionaryVO dictionary = new DictionaryVO();
            BeanUtils.copyProperties(sysDictEntity,dictionary);
            dictionaryList.add(dictionary);
        }
        return dictionaryList;
    }

    @Override
    public String findNameByCode(String code) {
        return this.selectOne(new EntityWrapper<SysDictEntity>().eq("code", code))
                .getValue();
    }

    @Override
    public SysDictEntity selectByCode(String code) {
        return this.selectOne(new EntityWrapper<SysDictEntity>()
                .eq(StringUtils.isNotBlank(code), "code", code));
    }

}
