package xyz.hrui.combination;

/**
 * 抽象文件构件定义
 * @author huangrui
 * @date 2016-12-21
 */
public interface FileComponent {
	void add(FileComponent file);
	void remove(FileComponent file);
	FileComponent getFile(int i);
	void scanFile(); //扫面文件杀毒
}
