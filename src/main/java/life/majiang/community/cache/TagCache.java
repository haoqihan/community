package life.majiang.community.cache;

import life.majiang.community.dto.TagDTO;
import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class TagCache {
    public static List<TagDTO> get() {
        List<TagDTO> tagDTOS = new ArrayList<>();
        TagDTO program = new TagDTO();
        program.setCategoryName("开发语言");
        program.setTags(Arrays.asList("js", "php", "css", "html", "java", "python","php","golang","react","c","C++","nodejs","javascript","typescript","xxx","xxxx","xxxxxx"));
        tagDTOS.add(program);

        TagDTO frameWork = new TagDTO();
        frameWork.setCategoryName("平台框架");
        frameWork.setTags(Arrays.asList("django", "flask", "vue", "react", "spring boot", "gin", "beego"));
        tagDTOS.add(frameWork);

        TagDTO server = new TagDTO();
        server.setCategoryName("服务器");
        server.setTags(Arrays.asList("linux", "nginx", "docker", "tomcat", "unix", "windows", "centos"));
        tagDTOS.add(server);

        return tagDTOS;
    }

    public static String filterInValid(String tags) {
        String[] split = StringUtils.split(tags, ",");
        List<TagDTO> tagDTOS = get();
        List<String> tagList = tagDTOS.stream().flatMap(tagDTO -> tagDTO.getTags().stream()).collect(Collectors.toList());
        String invalid = Arrays.stream(split).filter(t -> !tagList.contains(t)).collect(Collectors.joining(","));
        return invalid;

    }

}
