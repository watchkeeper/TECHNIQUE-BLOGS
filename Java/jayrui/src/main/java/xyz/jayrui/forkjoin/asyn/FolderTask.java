package xyz.jayrui.forkjoin.asyn;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.RecursiveTask;

import lombok.EqualsAndHashCode;
import lombok.Value;

/**
 * Description: 搜索指定扩展名文件<br>
 * <p>
 * Date: 2017-03-15
 *
 * @author: huangrui
 * @Version: 1.0
 */
@Value
@EqualsAndHashCode(callSuper = true)
public class FolderTask extends RecursiveTask<List<String>> {
    private static final long serialVersionUID = 1L;

    private final String path;
    private final String extension;


    @Override
    protected List<String> compute() {
        List<String> results = new ArrayList<>();
        List<FolderTask> tasks = new ArrayList<>();

        //1.获取文件内容
        File file = new File(path);
        File[] files = file.listFiles();
        if(!Objects.isNull(files)){
            for(File f : files){
                if(f.isDirectory()){
                    FolderTask ft = new FolderTask(f.getAbsolutePath(),extension);
                    ft.fork();
                    tasks.add(ft);
                }else{
                    if(check(f.getName()))
                        results.add(f.getAbsolutePath());
                }
            }
        }

        addFromTasks(tasks,results);
        return results;
    }

    private void addFromTasks(List<FolderTask> tasks, List<String> results) {
        for (FolderTask task : tasks){
            results.addAll(task.join());
        }
    }

    private boolean check(String name) {
        return name.endsWith(extension);
    }
}
