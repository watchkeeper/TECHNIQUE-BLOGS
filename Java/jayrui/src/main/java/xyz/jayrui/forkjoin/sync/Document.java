package xyz.jayrui.forkjoin.sync;

import java.util.Random;

/**
 * Description: <br>
 * <p>
 * Date: 2017-03-15
 *
 * @author: huangrui
 * @Version: 1.0
 */
public class Document {
    private String words[] = {"sima","hello","print","thread"
                            ,"java","Linux","c","python","pool"
                            ,"process","tcp/ip","protocol"};

    public String[][] getDocument(int line,int row,String key){
        int counter = 0;
        Random random = new Random();
        String document[][] = new String[line][row];

        for(int i = 0;i < line;i++){
            for(int j = 0;j < row;j++){
                int index = random.nextInt(words.length);
                document[i][j] = words[index];

                if(words[index].equals(key))
                    counter++;
            }
        }
        System.out.printf("Document: the word '%s' appears %d times in the document\n",key,counter);

        return document;
    }
}
