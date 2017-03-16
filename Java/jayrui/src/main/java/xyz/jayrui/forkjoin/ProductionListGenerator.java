package xyz.jayrui.forkjoin;

import java.util.ArrayList;
import java.util.List;

/**
 * Description: <br>
 * <p>
 * Date: 2017-03-14
 *
 * @author: huangrui
 * @Version: 1.0
 */
public class ProductionListGenerator {
    public List<Production> generate(int size){
        List<Production> ps = new ArrayList<>();
        for(int i = 0;i<size;i++){
            Production p = new Production("product" + i,10);
            ps.add(p);
        }
        return ps;
    }
}
